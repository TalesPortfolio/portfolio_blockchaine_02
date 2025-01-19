/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   minerClient.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/19 18:57:59 by tales             #+#    #+#             */
/*   Updated: 2025/01/19 19:13:59 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import axios from "axios";

const BLOCKCHAIN_SERVER = 'http://localhost:3000/';

async function mine() {
    const { data } = await axios.get(`${BLOCKCHAIN_SERVER}blocks/next`);
    console.log(data);
}

mine()