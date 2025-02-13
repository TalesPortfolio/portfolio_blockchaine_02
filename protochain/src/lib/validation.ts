export default class Validation{
    success: boolean;
    message: string;
 
    /**
     * Create a new validation object
     * @param success If the validation was successfull
     * @param message The validation message, if validation is valid
     */
    constructor(success: boolean = true, message: string = ""){
        this.success = success;
        this.message = message;
    }
}
