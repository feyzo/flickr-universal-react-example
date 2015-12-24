import React, { Component } from 'react'

class Root extends Component {

	renderInitialData() {
		if (this.props.initialData) {
			let innerHtml = `window.__initialData__ = ${JSON.stringify(this.props.initialData)}`;
			return (
				<script dangerouslySetInnerHTML={{__html: innerHtml}} />
			);
		}
	}

	render() {
		const isDeveloping = process.env.NODE_ENV !== 'production';
		const head = this.props.head;
		
// {head.title.toComponent()}
// 					{head.meta.toComponent()}
// 					{head.link.toComponent()}

					// {head.script.toComponent()}

		return (
			<html>
				<head>
					
				</head>
				<body>
					<div id='root' dangerouslySetInnerHTML={{__html: this.props.content}} />
					{this.renderInitialData()}
					<script src={isDeveloping ? '/bundle.js' : '/bundle.min.js'}></script>
				</body>
			</html>
		);
	}
}

export default Root;
