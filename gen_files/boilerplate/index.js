const getCommand = function() {

    /**
     * 1. variable declarations
     * */
    let _args = process.argv;
    let _mssg = `
            Please insert 
            a valid command 
            with the following format [node] 
            [index.js] [gen] [-n] [component_name] `;
    const _copy = _args.slice(2);

    /**
     * 2. check if commands are more than 2 args
     * */
    if(_args && _args.length < 3) {
        return _mssg;
    }


    /**
     * 3. return if custom component generator command
     * */
    if( 
        _copy.length >= 3      &&
        _copy[0]     === 'gen' &&
        _copy[1]     === '-n'  
    ) {
        // return a copy array without the two first array items
        console.log('>>>>>>', _copy);
        return _copy;
    }else {
        return _mssg;
    }

    
};

module.exports = getCommand();
