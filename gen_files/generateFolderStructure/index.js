const fs = require('fs');
const path = require('path');
const cmds = require('../boilerplate/index');
const subDirs = [ 
                    {   
                        subName: 'css',
                        fileType: 'style.css',
                        fileContent: '',
                    }, 
                    {   
                        subName: 'html',
                        fileType: 'template.html',
                        fileContent: '',
                    }, 
                    {   
                        subName: 'js',
                        fileType: 'component.ts',
                        fileContent: '',
                    },
                    {   
                        subName: 'resources',
                        fileType: 'resources.el.ts',
                        fileContent: '',
                    }                    
                ];

function generateCustomComponent() {

    /**
     * 1. get the name of the custom component folder
     * */
    
    const _componentName = cmds[2];

    if (!_componentName[2]) {
        console.error(`Invalid command`);
        return;
    }


    /**
     * 2. get the current path
     *    then create the component folder
     *    ( maybe must check if this 
     *      folder is direct subfolder of angular src folder )
     * */
    console.log("./ = %s", path.resolve("./"));
    console.log("__dirname = %s", path.resolve(__dirname));


    /**
     * 3. create a folder with the _componentName
     *    if not exist.
     * */
    let dir = `./${_componentName}`;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }


     /**
     * 4. creating the subfolders
     *    if not exist.
     * 
     *    ======================
     * 
     *    create the files
     *    if not exist and if the 
     *    corresponding subfolders exist
     * */        
    
    for( sub of subDirs ) {

        if (!fs.existsSync(`${dir}/${sub.subName}`)){

            // create sub directories
            fs.mkdirSync(`${dir}/${sub.subName}`);

            // create the files in the sub directories

            fs.appendFileSync(
                `${dir}/${sub.subName}/${dir}.${sub.fileType}`, 
                `${sub.fileContent}`
            );
            
            // must be refactored!!!! - SERGIO KAGIEMA
            if(sub.subName === 'resources') {
                fs.appendFileSync(
                    `${dir}/${sub.subName}/${dir}.resources.en.ts`, 
                    `${sub.fileContent}`
                );                
            }

        }

    }

}

module.exports = generateCustomComponent;
