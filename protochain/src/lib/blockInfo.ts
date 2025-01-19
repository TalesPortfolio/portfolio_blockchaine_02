/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blockInfo.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/19 17:25:50 by tales             #+#    #+#             */
/*   Updated: 2025/01/19 17:31:18 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


/**
 * The Block Info
 */
export default interface BlockInfo{
    index:number;
    previousHash: string;
    difficulty: number;
    maxDifficulty:number;
    feePerTx: number;
    data:string;
}