/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transactionSearch.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/23 12:58:15 by tales             #+#    #+#             */
/*   Updated: 2025/01/23 13:01:45 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Transaction from "./transaction";

export default interface TransactionSearch{
    transaction: Transaction,
    mempoolIndex: number;
    blockIndex: number;
}