const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { circle, square, triangle } = require('./lib/shapes');

const prompts = [
    {
        type: 'input',
        name: 'acronym',
        message: 'Enter up to three characters to include in the logo:',
        validate: input => input.length > 0 && input.length <= 3 ? true : 'Please enter between 1 and 3 characters'
    },

{
    type: 'input',
    name: 'textColor',
    message: 'Enter the color of the text (color name or hexidecimal number):',
},
{
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for the logo:',
    choices: ['circle', 'square', 'triangle']
},
{
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the color of the shape (color name or hexidecimal number):',
},
];

async function generateLogo() {
    try {
        const answers = await inquirer.prompt(prompts);
        const svgContent = generateSvgContent(answers);
        fs.writeFileSync(path.join(__dirname, 'logo.svg'), svgContent, 'utf-8');
        console.log('logo.svg has been created');
    } catch (error) {
        console.error('Error creating logo:', error);
    }
}

function generateSvgContent({ acronym, textColor, shape, shapeColor }) {
    let shapeSVG = '';
    const centerX = 150, centerY = 100, size = 50;
    let textY = centerY;

    switch(shape) {
        case 'circle':
            shapeSVG = circle(centerX, centerY, size, shapeColor);
            break;
        case 'square':
            shapeSVG = square(centerX, centerY, size, shapeColor);
            break;
        case 'triangle':
            shapeSVG = triangle(centerX, centerY, size, shapeColor);
            break;
    }

    return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shapeSVG}
        <text x="${centerX}" y="${textY}" fill="${textColor}" text-anchor="middle" font-size="20">${acronym}</text>
    </svg>`;
}


generateLogo();