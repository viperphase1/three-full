import { GLNode } from './GLNode.js'



var AttributeNode = function ( name, type ) {

	GLNode.call( this, type );

	this.name = name;

};

AttributeNode.prototype = Object.create( GLNode.prototype );
AttributeNode.prototype.constructor = AttributeNode;
AttributeNode.prototype.nodeType = "Attribute";

AttributeNode.prototype.getAttributeType = function ( builder ) {

	return typeof this.type === 'number' ? builder.getConstructorFromLength( this.type ) : this.type;

};

AttributeNode.prototype.getType = function ( builder ) {

	var type = this.getAttributeType( builder );

	return builder.getTypeByFormat( type );

};

AttributeNode.prototype.generate = function ( builder, output ) {

	var type = this.getAttributeType( builder );

	var attribute = builder.material.getAttribute( this.name, type );

	return builder.format( builder.isShader( 'vertex' ) ? this.name : attribute.varying.name, this.getType( builder ), output );

};

AttributeNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.out = this.type;

	}

	return data;

};

export { AttributeNode }
