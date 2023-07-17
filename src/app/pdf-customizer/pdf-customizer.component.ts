import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf-customizer',
  templateUrl: './pdf-customizer.component.html',
  styleUrls: ['./pdf-customizer.component.css']
})
export class PdfCustomizationComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;
  //@ViewChild('gridOverlay', { static:true }) gridOverlayRef: ElementRef<HTMLDivElement>;

  canvas: fabric.Canvas;
  selectedField: string = '';
  
  inputBoxes: { [field: string]: fabric.ITextbox } = {};
  fieldStyles: { [field: string]: any } = {};
  fontSize: number = 20;
  fontStyle: string = 'normal';
  fontWeight: string = 'normal';
  fontFamily: string = 'Arial';
  isUnderline: boolean = false;
  textColor: string = '#000000';
  backgroundColor: string = '#ffffff';
  textAlign: string = 'left';
  fontList: string[] = ['Arial', 'Verdana', 'Times New Roman', 'Courier New'];
  selectedObject: fabric.Object;

  //Grid Properties
  cellSize: number = 50;
  spacing: number = 10;
  gridRows: number;
  gridColumns: number;

  ngOnInit(): void {
    // this.canvas = new fabric.Canvas(this.canvasRef.nativeElement, {
    //   width: 600,
    //   height: 1200
    // });

    // console.log("ngOnInit called");

    // this.canvas.on('mouse:up', (event) => {
    //   if (event.target) {
    //     this.onObjectSelected(event.target);
    //   } else {
    //     this.onObjectSelected(null);
    //   }
    // });

    

    // this.calculateGridDimensions();
    // this.drawGrid();
    
  }


  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");

    this.canvas = new fabric.Canvas(this.canvasRef.nativeElement, {
      width: 600,
      height: 1200
    });

    console.log("ngOnInit called");

    this.canvas.on('mouse:up', (event) => {
      if (event.target) {
        this.onObjectSelected(event.target);
      } else {
        this.onObjectSelected(null);
      }
    });

    this.canvas.on('object:moving', (event)=>{
      this.handleObjectMoved(event.target);
    });

    

    this.calculateGridDimensions();
    this.drawGrid();
    
    
  }

  

  selectField(field: string): void {
    this.selectedField = field;
    console.log("selectField called");
  }

  updateFieldStyle(style: any): void {
    this.fieldStyles[this.selectedField] = style;
    const activeObject = this.canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      activeObject.set(style);
      this.canvas.renderAll();
    }
    console.log("updateFieldStyle called");
  }

  

  

  clearCanvas(): void {
    this.canvas.clear();
    console.log("clear canvas called");
  }

  drawGrid(): void{
    const ctx = this.canvas.getContext('2d');

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    //Draw the vertical line grids
    for(let x = this.cellSize; x < this.canvas.width; x += this.cellSize + this.spacing){
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.canvas.height);
      ctx.stroke();
    }

    //Draw the horizontal line grids
    for(let y = this.cellSize; y<this.canvas.height; y += this.cellSize + this.spacing){
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.canvas.width, y);
      ctx.stroke();
    }

    console.log("drawGrid called")
  }

  redrawCanvas(): void{
    this.canvas.clear();
    

    this.canvas.getObjects().forEach((obj)=>{
      obj.visible = true;
      this.canvas.add(obj);
    });
    
    this.canvas.renderAll();
    console.log("redrawCanvas called");
  }

  addTextToCanvas(): void {
    if (this.selectedField) {
      const style = this.fieldStyles[this.selectedField] || {};
  
      // Check if there's an active object on the canvas
      const activeObject = this.canvas.getActiveObject();
      if (activeObject && activeObject.type === 'textbox') {
        // Update the existing text object's content and style
        activeObject.set({
          text: this.selectedField,
          ...style
        });
      } else {
        // Create a new text object
        const text = new fabric.Textbox(this.selectedField, {
          left: 50,
          top: 50,
          fontSize: style.fontSize || 20,
          ...style
        });
  
        this.canvas.add(text);
      }
  
      this.canvas.renderAll();
      this.drawGrid();
    }
    console.log("addTextToCanvas called");
  }

  // Add Line to Canvas
  addLineToCanvas(): void {
    const line = new fabric.Line([50, 50, 200, 50], {
      stroke: 'black',
      strokeWidth: 2
    });

    this.canvas.add(line);
    this.canvas.renderAll();

    console.log("addLineToCanvas called");
}

// Add Rectangle to Canvas
addRectangleToCanvas(): void {
  const rectangle = new fabric.Rect({
    left: 50,
    top: 50,
    width: 250,
    height: 200,
    fill:'transparent',
    stroke: 'black',
    strokeWidth:1
  });

  this.canvas.add(rectangle);
  this.canvas.renderAll();
  this.drawGrid();

  console.log("addRectangle to canvas called");
}

// Add Logo to Canvas
addLogoToCanvas(): void {
  const logoUrl = 'assets/argusoft.jpg'; 
  
  fabric.Image.fromURL(logoUrl, (image) => {
    image.set({
      left: 50,
      top: 50,
      scaleX: 0.5,
      scaleY: 0.5
    });
    this.canvas.add(image);
    this.canvas.renderAll();
    this.drawGrid();
  });
  console.log("Add Logo to canvas called");
}

allowDrop(event: DragEvent): void {
  event.preventDefault();
  console.log("allowDrop called");
}

dropField(event: DragEvent): void {
  event.preventDefault();
  const field = event.dataTransfer?.getData('text/plain');
  if (field) {
    const canvasElement = this.canvasRef.nativeElement;
    const canvasPosition = canvasElement.getBoundingClientRect();

    const text = new fabric.Textbox(field, {
      left: event.clientX - canvasPosition.left,
      top: event.clientY - canvasPosition.top,
      fontSize: 20
    });
    
    this.canvas.add(text);
    this.canvas.renderAll();
    this.drawGrid();
  }
  console.log("dropField called");
}

moveField(event: MouseEvent): void {
  const activeObject = this.canvas.getActiveObject();
  if(activeObject){
    const canvasPosition = this.canvasRef.nativeElement.getBoundingClientRect();
    const pointer = this.canvas.getPointer(event);

    activeObject.set({
      left: pointer.x - canvasPosition.left,
      top: pointer.y - canvasPosition.top
    });
    this.canvas.renderAll();
    this.drawGrid();
  }

  console.log("moveField called");
}

resize(event: MouseEvent): void {
  const activeObject = this.canvas.getActiveObject();
  if(activeObject && activeObject.type === 'textbox'){
    const canvasPosition = this.canvasRef.nativeElement.getBoundingClientRect();
    const pointer = this.canvas.getPointer(event);

    const newWidth = pointer.x - canvasPosition.left - activeObject.left;
    const newHeight = pointer.y - canvasPosition.top - activeObject.top;

    activeObject.set({
      width: newWidth,
      height: newHeight
    });

    this.redrawCanvas();
  }
  console.log("resize called");
}

fieldDropped(field: string): void {
  const x = 50;
  const y = 50;
  const width = 150;
  const height = 30;

  // Create an input box element
  const inputBox = new fabric.ITextbox('', {
    left: x,
    top: y,
    width: width,
    height: height,
    fontSize: 16,
    fill: '#000000',
    borderColor: '#000000',
    hasControls: false,
    hasBorders: false,
    editable: true
  });

  // Add the input box to the canvas
  this.canvas.add(inputBox);
  this.inputBoxes[field] = inputBox;

  // Listen to changes in the input box and update the field value
  inputBox.on('changed', () => {
    this.updateFieldValue(field, inputBox.text);
  });

  // Listen to selection events to enable editing the input box
  this.canvas.on('selection:created', (e) => {
    if (e.target === inputBox) {
      inputBox.enterEditing();
    }
  });
  this.canvas.on('selection:updated', (e) => {
    if (e.target === inputBox) {
      inputBox.enterEditing();
    }
  });
  //this.drawGrid();

  console.log("fieldDropped method called");
}

calculateGridDimensions(): void{
  const canvasElement: HTMLCanvasElement = this.canvasRef.nativeElement;
  const canvasWidth = canvasElement.width;
  const canvasHeight = canvasElement.height;

  this.gridRows = Math.floor(canvasHeight / (this.cellSize + this.spacing));
  this.gridColumns = Math.floor(canvasWidth / (this.cellSize + this.spacing));

  console.log("calculateGridDimensions calld");
}


updateFieldValue(field: string, value: string): void {
  // Handle the field value update
  console.log(`Field: ${field}, Value: ${value}`);
  console.log("updateFieldValue called");
}


downloadPDF(): void {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const canvasElement: HTMLCanvasElement = this.canvasRef.nativeElement;

  html2canvas(canvasElement).then((canvas) => {
    const imageData = canvas.toDataURL('image/png'); // Use PNG format for better quality
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate the desired size of the image in the PDF, maintaining the aspect ratio
    const scaleFactor = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
    const imageWidth = canvas.width * scaleFactor;
    const imageHeight = canvas.height * scaleFactor;

    // Calculate the positioning of the image in the center of the PDF page
    const positionX = (pdfWidth - imageWidth) / 2;
    const positionY = (pdfHeight - imageHeight) / 2;

    // Add the image to the PDF document with the desired size and positioning
    pdf.addImage(imageData, 'PNG', positionX, positionY, imageWidth, imageHeight);
    pdf.save('canvas.pdf');
  });
  console.log("downloadPDF method called");
}

onObjectSelected(target: fabric.IEvent): void {
  this.drawGrid();
  this.selectedObject = target;


  console.log("onObjectSelectedMethod called");
}

// gridStay(): void{
//   const ctx = this.canvas.getContext('2d');
//   ctx.beginPath().drawGrid();
//   console.log("gridStay called");
// }


updateSelectedObjectStyle(): void {
  if (this.selectedObject && this.selectedObject instanceof fabric.Textbox) {
    this.selectedObject.set({
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontWeight: this.fontWeight,
      fill: this.textColor
    });
    this.canvas.renderAll();
  }
  console.log("updateSelectedObjectStyle");
}

handleObjectMoved(target: fabric.Object): void{
  target.setCoords();
  this.canvas.renderAll();
  this.drawGrid();
}






}


  

