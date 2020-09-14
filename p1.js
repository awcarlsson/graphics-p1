window.onload = function() {

    var canvas = document.getElementById('p1Canvas')

    var c1xSlider = document.getElementById('c1x')
    var c1ySlider = document.getElementById('c1y')
    var c1LengthSlider = document.getElementById('length1')
    var c1WidthSlider = document.getElementById('width1')
    c1xSlider.value = 330
    c1ySlider.value = 230
    c1LengthSlider.value = 100
    c1WidthSlider.value = 40

    var c2xSlider = document.getElementById('c2x')
    var c2ySlider = document.getElementById('c2y')
    var c2LengthSlider = document.getElementById('length2')
    var c2WidthSlider = document.getElementById('width2')
    c2xSlider.value = 150
    c2ySlider.value = 50
    c2LengthSlider.value = 400
    c2WidthSlider.value = 100

    var context = canvas.getContext('2d')

    function drawHyperRect() {

        // clear old frame
        canvas.width = canvas.width
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        drawBackgroundShapes()

        color = "#42f5b3"

        // draw cuboid2
        c2X = parseInt(c2xSlider.value)
        c2Y = parseInt(c2ySlider.value)
        c2Length = parseInt(c2LengthSlider.value)
        c2Width = parseInt(c2WidthSlider.value)
        drawCuboid(c2X,c2Y,c2Length,c2Width,color)

        // draw cuboid1
        c1X = parseInt(c1xSlider.value)
        c1Y = parseInt(c1ySlider.value)
        c1Length = parseInt(c1LengthSlider.value)
        c1Width = parseInt(c1WidthSlider.value)
        drawCuboid(c1X,c1Y,c1Length,c1Width,color)

        // connect vertices
        connectVertices(c1X, c1Y, c1Length, c1Width, c2X, c2Y, c2Length, c2Width, color)
    }

    function drawBackgroundShapes() {

        context.lineWidth = 4

        var i
        var j
        shape1 = true
        shape2 = false
        shape3 = false
        for (j = 20; j < canvas.height; j+= 50) {
            for (i = 20; i < canvas.width; i+= 50) {
                if (shape1) {
                    context.strokeStyle = "#ffbffe"
                    context.fillStyle = "#ffbffe"
                    context.beginPath()
                    context.moveTo(i,j)
                    context.lineTo(i+5,j+5)
                    context.lineTo(i,j+10)
                    context.lineTo(i-5,j+5)
                    context.closePath()
                    context.fill()
                    context.stroke()
                    shape1 = false
                    shape2 = true
                }
                else if (shape2) {
                    context.strokeStyle = "#f678ff"
                    context.fillStyle = "#f678ff"
                    context.beginPath()
                    context.moveTo(i,j)
                    context.lineTo(i,j+5)
                    context.lineTo(i+5,j+5)
                    context.lineTo(i+5,j)
                    context.closePath()
                    context.fill()
                    context.stroke()
                    shape2 = false
                    shape3 = true
                }
                else if (shape3) {
                    context.strokeStyle = "#ff78a1"
                    context.fillStyle = "#ff78a1"
                    context.beginPath()
                    context.moveTo(i,j)
                    context.lineTo(i+5,j+5)
                    context.lineTo(i-5,j+5)
                    context.closePath()
                    context.fill()
                    context.stroke()
                    shape3 = false
                    shape1 = true
                }
            }
        }
    }

    function drawCuboid(xCoord, yCoord, length, width, color) {

        context.lineWidth = 5
        context.strokeStyle = color

        // front face
        context.beginPath();
        context.moveTo(xCoord,yCoord)
        context.lineTo(xCoord+length,yCoord)
        context.lineTo(xCoord+length,yCoord+length)
        context.lineTo(xCoord,yCoord+length)
        context.lineTo(xCoord,yCoord)
        context.closePath()
        context.stroke()

        // back face
        context.beginPath()
        context.moveTo(xCoord+width,yCoord+width)
        context.lineTo(xCoord+length+width,yCoord+width)
        context.lineTo(xCoord+length+width,yCoord+length+width)
        context.lineTo(xCoord+width,yCoord+length+width)
        context.lineTo(xCoord+width,yCoord+width)
        context.closePath()
        context.stroke()

        // connect faces
        context.beginPath()
        context.moveTo(xCoord,yCoord)
        context.lineTo(xCoord+width,yCoord+width)
        context.moveTo(xCoord+length,yCoord)
        context.lineTo(xCoord+length+width,yCoord+width)
        context.moveTo(xCoord+length,yCoord+length)
        context.lineTo(xCoord+length+width,yCoord+length+width)
        context.moveTo(xCoord,yCoord+length)
        context.lineTo(xCoord+width,yCoord+length+width)
        context.closePath()
        context.stroke()
    }

    function connectVertices(c1X, c1Y, c1Length, c1Width, c2X, c2Y, c2Length, c2Width, color){
        
        context.lineWidth = 5
        context.strokeStyle = color

        // connect front faces
        context.beginPath();
        context.moveTo(c1X,c1Y)
        context.lineTo(c2X,c2Y)
        context.moveTo(c1X+c1Length,c1Y)
        context.lineTo(c2X+c2Length,c2Y)
        context.moveTo(c1X+c1Length,c1Y+c1Length)
        context.lineTo(c2X+c2Length,c2Y+c2Length)
        context.moveTo(c1X,c1Y+c1Length)
        context.lineTo(c2X,c2Y+c2Length)
        context.stroke()

        // connect back faces
        context.beginPath();
        context.moveTo(c1X+c1Width,c1Y+c1Width)
        context.lineTo(c2X+c2Width,c2Y+c2Width)
        context.moveTo(c1X+c1Length+c1Width,c1Y+c1Width)
        context.lineTo(c2X+c2Length+c2Width,c2Y+c2Width)
        context.moveTo(c1X+c1Length+c1Width,c1Y+c1Length+c1Width)
        context.lineTo(c2X+c2Length+c2Width,c2Y+c2Length+c2Width)
        context.moveTo(c1X+c1Width,c1Y+c1Length+c1Width)
        context.lineTo(c2X+c2Width,c2Y+c2Length+c2Width)
        context.stroke()
        context.closePath()
    }

    c1xSlider.addEventListener("input",drawHyperRect)
    c1ySlider.addEventListener("input",drawHyperRect)
    c1LengthSlider.addEventListener("input",drawHyperRect)
    c1WidthSlider.addEventListener("input",drawHyperRect)
    c2xSlider.addEventListener("input",drawHyperRect)
    c2ySlider.addEventListener("input",drawHyperRect)
    c2LengthSlider.addEventListener("input",drawHyperRect)
    c2WidthSlider.addEventListener("input",drawHyperRect)

    drawHyperRect()
}