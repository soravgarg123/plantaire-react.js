import React, { Component } from 'react'
import { Row } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import { Document, Page } from 'react-pdf';


// import './summary.css';

import * as jsPDF from 'jspdf'


const style = {
	margin: 12,
	//width: 200,
	height: 50,
	position: "fixed",
	bottom: 5,
	right: 10
};

const iconStyles = {
	//marginRight: 24,
	//verticalAlign: "text-bottom",
	//marginLeft: 7,
	fontSize: 30,
	//MsTransform: "rotate(-35deg)",
	//WebkitTransform: "rotate(-35deg)",
	//transform: "rotate(-35deg)"
};
// const labelStyle = {
// 	fontSize: 30,
// 	fontWeight: 600
// }

const isObject = (value) => {
	return value && typeof value === 'object' && value.constructor === Object;
}

const isEven = (n) => {
	return n % 2 === 0;
}

const sendEmail = (attachment, filenane, fromUser) => {
	try {
		//https://www.smtpjs.com/
		/*eslint-disable no-undef*/
		const smtp = "smtp-mail.outlook.com"
		const username = "order_form_osskin@outlook.com";
		const password = "2qnuUE0vdPtBnFNi5A7m";
		const subject = "Order Form - from " + fromUser.name;
		const body = "new order : " + filenane;
		const datauri = attachment;
		const sendto = "jean-philippe.carmona@caboma.com"
		//const sendtoBeta = "michal.wozniak@caboma.com";
		//const datauri = "data:" + file.type + ";base64," + btoa(reader.result);
		Email.sendWithAttachment(username,
			sendto,
			subject,
			body,
			smtp,
			username,
			password,
			datauri)
	} catch (error) {
		console.error(error);
	}
}




const getTitle = (properties, property) => {
	console.log(property, 'property')
	for (const [key, value] of Object.entries(properties)) {
		if (key === property) {
			return value.title
		}
	}
	return null;
}

const removeElement = (array, element) => {
	return array.filter(e => e !== element);
}

/**
 * 
 * @param {object} pdf pdf driver 
 * @param {object} schema 
 * @param {object} info 
 * @param {object} setting pdf setting
 * @param {boolean} tabOptinal 
 * @param {object} definitionUsed enable if using definition schema 
 */
function writeInfo(pdf, schema, info, setting, tabOptinal = false, definitionUsed = false, formStep, toggleValue) {
	for (const [key, value] of Object.entries(info)) {
		let infoText = "";
		
			if (definitionUsed) {
				if(formStep == 'covers'){
					if(toggleValue.covers != false){
						if(getTitle(schema["properties"], key) == null){
							infoText = key + " : " + value;
						}else{
							infoText = getTitle(schema["properties"], key) + " : " + value;
						}
					
					}else{
						if(getTitle(schema["properties"], key) != null){
							infoText = getTitle(schema["properties"], key) + " : " + value;
						}
					
						
					}
					
				}else{
					infoText = getTitle(schema["properties"], key) + " : " + value;

				}
				console.log(infoText, key, formStep)
			}
			else {
				infoText = getTitle(schema, key) + " : " + value;
			}
		if(infoText){
			let x = setting.xLeft
			if (tabOptinal) {
				x += 5;
			}
			pdf.text(x, setting.infoY, infoText);
			setting.infoY += 5;
		}
	}
}

const genereteFileName = (firstname, lastname) => {

	const event = new Date();
	const isoTime = event.toISOString();
	return `${firstname}_${lastname}_${isoTime}.pdf`;
};

export default class SummaryForm extends Component {

	generatePDF(information,user , submitOption) {
		let firstName = "";
		let lastName  = "";
		

		//get all form data
		//console.log(information
		let formOrder = information.tabs
		formOrder = removeElement(formOrder, "summary");


		//initiate pdf setting
		var doc = new jsPDF("p", "mm", "a4");
		const width = doc.internal.pageSize.width;
		const height = doc.internal.pageSize.height;

		const pdfSetting = {
			pageWidth: width,
			pageHeigth: height,
			xLeft: 20,
			xRight: 100,
			infoY: 40
		}

		doc.setFontSize(22);
		const title = "Order Form"
		const textWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
		const textOffset = (pdfSetting.pageWidth - textWidth) / 2;
		doc.text(textOffset, 20, title);
		/// start printing order form information
		for (const [key, formStep] of Object.entries(formOrder)) {
			console.log(formStep, key)
			const formStepInformation = information[formStep];
			console.log(formStepInformation)
			if(formStepInformation){
				console.log(formStepInformation, 'formStepInformation')
				if (Object.keys(formStepInformation).includes("formData")) {
					const formData = formStepInformation["formData"];
					console.log(formData, 'formData')
					const schemaProperties = formStepInformation["schema"]["jsonschema"]["properties"];
					console.log(formStepInformation["schema"], 'schemaProperties')
					const schemaDefinitions = formStepInformation["schema"]["jsonschema"]["definitions"];
					const formDataTite = formStepInformation["title"]


					console.log("form data found : " + formStep);

					if (formStep === "infos") {
						doc.setFontSize(15);
						doc.text(pdfSetting.xLeft, pdfSetting.infoY, formDataTite);
						pdfSetting.infoY += 2;
						doc.line(pdfSetting.xLeft, pdfSetting.infoY, 60, pdfSetting.infoY) // horizontal line
						pdfSetting.infoY += 5;
						doc.setFontSize(10);
						//get all form items
						let nbOfElement = 1;

						for (const [formDataKey, formDataValue] of Object.entries(formData)) {
							if(formDataKey === "firstName")
							{
								firstName = formDataValue;
							}
							if(formDataKey === "lastName")
							{
								lastName = formDataValue;
							}

							const infoText = getTitle(schemaProperties, formDataKey) + " : " + formDataValue;
							if (isEven(nbOfElement)) {
								doc.text(pdfSetting.xRight, pdfSetting.infoY, infoText);
								pdfSetting.infoY += 5;
							} else {
								doc.text(pdfSetting.xLeft, pdfSetting.infoY, infoText);
							}
							nbOfElement++;
							// console.log(infoText)

						}
						pdfSetting.infoY += 5;

					} else {
						let toggleValue = localStorage.getItem('toggleButton');
						toggleValue = JSON.parse(toggleValue);
console.log(toggleValue)
						doc.setFontSize(15);
						doc.text(pdfSetting.xLeft, pdfSetting.infoY, formDataTite);
						pdfSetting.infoY += 2;
						doc.line(pdfSetting.xLeft, pdfSetting.infoY, 60, pdfSetting.infoY) // horizontal line
						pdfSetting.infoY += 5;
						doc.setFontSize(10);
						console.log(formData, formData)

						//get all form items
						for (const [formDataKey, formDataValue] of Object.entries(formData)) {
							let returntype = true;
							if(formStep == 'shell'){
								if(toggleValue.shell == false){
									let returnData = formDataKey.split('1');
									if(returnData.length > 1){
										returntype = false;
									}
									
								}
							}else if (formStep == 'addons') {
								if(toggleValue.addons == false){
									let returnData = formDataKey.split('1');
									if(returnData.length > 1){
										returntype = false;
									}
									
								}

							}else if (formStep == 'covers') {
								if(toggleValue.covers == false){
									let returnData = formDataKey.split('1');
									if(returnData.length > 1){
										returntype = false;
									}
								}
							}else if (formStep == 'rigidity') {
								if(toggleValue.rigidity == false){
									let returnData = formDataKey.split('1');
									if(returnData.length > 1){
										returntype = false;
									}
								}
							}

							if(returntype){

								if (isObject(formDataValue)) {
									
									//console.error(formStepInformation)
									const infoText = getTitle(schemaProperties, formDataKey) + " : "
									doc.text(pdfSetting.xLeft, pdfSetting.infoY, infoText);

									pdfSetting.infoY += 5;
									console.log(formDataKey, 'formDataKey', formDataValue)
									writeInfo(doc, schemaDefinitions[formDataKey], formDataValue, pdfSetting, true, true, formStep, toggleValue);
								} else {
									
									const infoText = getTitle(schemaProperties, formDataKey) + " : " + formDataValue;
									console.log(infoText)
									doc.text(pdfSetting.xLeft, pdfSetting.infoY, infoText);
									pdfSetting.infoY += 5;
								}
							}

						}
						pdfSetting.infoY += 5;

					}
				}
			}
			pdfSetting.infoY += 5;
		}

		// doc.rect(10, 30, 150, 75);

		
		if (submitOption) {

			const filename = genereteFileName(firstName, lastName);
			doc.setProperties({
				title: 'Order Form',
				subject: 'order form',
				author: user.name,
				creator: 'OSSKIN'
			});

			doc.save(filename)

			sendEmail(doc.output('datauristring', filename),filename,  user);


		} else {
			//window.open(doc.output('bloburl'), '_blank');

			return doc.output('datauristring');
		}


	}


	render() {
		const { parent , user} = this.props
		// const { formData, schema } = patient;

		const pdfData = this.generatePDF(parent, user, false);
		//console.log(pdfData)

		return (
			<div className="summary_container">

				<Row className="summary_container_pdf">
					{/* <h1>Summary </h1> */}
				</Row>
				<Row>

					<RaisedButton
						onClick={this.generatePDF.bind(this, parent, user, true)}
						label="SEND"
						style={style}
						backgroundColor="#06569b" labelColor="#fff"
						//	labelStyle={labelStyle}
						labelPosition="before"
						icon={<FontIcon className="material-icons" style={iconStyles}>send</FontIcon>}
					/>
				</Row>
				<Row>
					<div id="divToPDF">
						<Document
							scale={0.8}
							file={pdfData}>
							<Page pageNumber={1} />
						</Document>
						<p></p>
					</div>
				</Row>
			</div>
		)
	}
}

