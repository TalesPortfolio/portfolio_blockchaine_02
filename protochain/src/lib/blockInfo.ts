/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blockInfo.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/19 17:25:50 by tales             #+#    #+#             */
/*   Updated: 2025/01/22 18:04:22 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Transaction from "./transaction";


/**
 * The Block Info
 */
export default interface BlockInfo{
    index:number;
    previousHash: string;
    difficulty: number;
    maxDifficulty:number;
    feePerTx: number;
    transactions: Transaction[];
}