// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GameToken is ERC20 {
    address public immutable admin;
    uint256 public constant MAX_SUPPLY = 10_000 * 10**18;

    constructor() ERC20("GameToken", "GAM") {
        admin = msg.sender;
        _mint(admin, 1_000 * 10**18);
    }

    /// @notice Mint de novos tokens, até o limite MAX_SUPPLY
    function mint(address to, uint256 amount) external {
        require(msg.sender == admin, "only admin");
        require(totalSupply() + amount <= MAX_SUPPLY, "max supply exceeded");
        _mint(to, amount);
    }
}


//////////////////////////////////////////////////////////////////////////////////////////
// @author Tales Lima                                                                   //
// À propos des tokens GameToken (GAM)                                                  //
// Ce site utilise un token personnalisé basé sur la blockchain Ethereum ,              //
// appelé GameToken (GAM) . Ce token est conforme à la norme ERC-20 , ce qui signifie   //
// qu'il peut être transféré, échangé et utilisé dans des applications décentralisées.  //
//                                                                                      //    
// Fonctionnalités principales :                                                        //
// Approvisionnement initial : Lors du déploiement du contrat, 1 000 tokens ont         //
// été créés et envoyés à l’administrateur (le créateur du contrat).                    //
// Fonction Mint : Seul l’administrateur a le droit de créer (mint ) de nouveaux        //
// tokens et de les distribuer aux utilisateurs.                                        //
// Limite maximale (MAX_SUPPLY) : Le nombre total de tokens pouvant exister est         //
// limité à 10 000 tokens , empêchant toute création excessive et garantissant          //
// une offre prévisible.                                                                //
// Comment les utilisateurs reçoivent des tokens ?                                      //
// Lorsqu’un utilisateur effectue une action sur le site (comme terminer une tâche      //
// ou participer à une activité), l’administrateur peut envoyer automatiquement         //
// des tokens à l’adresse de l’utilisateur via la fonction mint().                      //
//////////////////////////////////////////////////////////////////////////////////////////

