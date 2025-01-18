/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blockchainServer.test.ts                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/18 19:58:43 by tales             #+#    #+#             */
/*   Updated: 2025/01/18 20:29:46 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import request from 'supertest'
import {describe, test, expect, jest} from '@jest/globals'
import {app} from '../src/server/blockchainServer'

jest.mock('../src/lib/block');
jest.mock('../src/lib/blockchain');

describe('BlockchainServer Test', () => {
    test('GET /status', async()=>{
        const response = await request(app)
        .get('/status');
    })
})

