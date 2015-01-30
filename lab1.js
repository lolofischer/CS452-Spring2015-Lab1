// JavaScript Document
var gl;
var points1;
var points2;
var points3;
var i=0;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	points1 = [
        vec2( -1, -1 ),
        vec2(  0,  1 ),
        vec2(  1, -1 )
    ];
	points2 = [
        vec2( -0.5, -0.5 ),
		vec2(  0.5, -0.5 ),
		vec2(  0.5,  0.5 ),
		
    ];
	points3 = [
        vec2( -0.5, -1 ),
        vec2(  0,  .5 ),
        vec2(  1, -1 )
    ];
	
	

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
	
	var original = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, original);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points1), gl.STATIC_DRAW );
	
	
    // Associate our shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	
    render(3);
	i=1;
	
	 canvas.onclick = function() {
		 if (i==0){
			var bufferId1 = gl.createBuffer();
    		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId1 );
    		gl.bufferData( gl.ARRAY_BUFFER, flatten(points1), gl.STATIC_DRAW );
			i=1;
			render(3);
		 }
		 else if (i==1){
			var bufferId2 = gl.createBuffer();
    		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    		gl.bufferData( gl.ARRAY_BUFFER, flatten(points2), gl.STATIC_DRAW );
			i=2;
			render(3);
		 }
		 else if (i==2){
			var bufferId3 = gl.createBuffer();
    		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
    		gl.bufferData( gl.ARRAY_BUFFER, flatten(points3), gl.STATIC_DRAW );
			i=0;
			render(3)
		 }
		     // Associate our shader variables with our data buffer
			var vPosition = gl.getAttribLocation( program, "vPosition" );
			gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
			gl.enableVertexAttribArray( vPosition );
		 
	 }
};
function render(num) {
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, num );
}
