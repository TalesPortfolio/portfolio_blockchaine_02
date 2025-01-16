/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   validation.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 21:42:46 by tales             #+#    #+#             */
/*   Updated: 2025/01/16 21:47:57 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//esta classe ajudar a monitorar meu codigo fornecendo mais detalhadamente os erros.

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
