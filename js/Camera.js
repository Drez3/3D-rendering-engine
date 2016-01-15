"use strict";
//
// Atributos da câmera virtual (C, N e V, triplas de pontos flutuantes,
//	d, hx, e hy, pontos flutuantes positivos)
//camera.cfg
///---------------------------------------\
//| -200 -50 300                          | ; Ponto da camera C
//| 0.667 0.172 -1                        | ; Vetor N (UP)
//| 0 3 0                                 | ; Vetor V (FRONT)
//| 65 0.5 0.6                            | ; distancia hx hy
//|                                       |
//\---------------------------------------/

function Camera(attrs) {

	this.position = attrs.position || vec3.create();
	this.upVector = attrs.up || vec3.create();		// N vector
	this.frontVector = attrs.front || vec3.create();	// V vector
	this.distance = attrs.dist || 10;
	this.width = attrs.hx || 10;
	this.height =attrs. hy || 10;
	this.rightVector = vec3.create();	// U vector
	//this.focus = vec3.create();

}

//
//Camera.prototype.setFocus = function(){
//	var frontVectorU = vec3.create();
//	vec3.normalize(frontVectorU, this.frontVector);
//	vec3.scaleAndAdd(this.focus, this.position, frontVectorU, this.distance)
//};

/*Ortonormaliza os vetores do sistema de coordenadas de vista*/
Camera.prototype.calculateUpVector = function() {
	this.upVector = vec3.normalize(this.upVector, this.upVector);

};

Camera.prototype.calculateFrontVector = function() {

	//double coef = (Algebra.produtoEscalar(V, N) / Algebra.produtoEscalar(N, N));
	var  coef = (vec3.dot(this.frontVector, this.upVector) / vec3.dot(this.upVector, this.upVector));

	this.frontVector[0] = this.frontVector[0] - (coef * this.upVector[0]);
	this.frontVector[1] = this.frontVector[1] - (coef * this.upVector[1]);
	this.frontVector[2] = this.frontVector[2] - (coef * this.upVector[2]);

	this.frontVector = vec3.normalize(this.frontVector, this.frontVector);
};

Camera.prototype.calculateRightVector = function() {
	//U = Algebra.produtoVetorial(N, V);
	this.rightVector = vec3.cross(vec3.create(), this.upVector, this.frontVector);
};


