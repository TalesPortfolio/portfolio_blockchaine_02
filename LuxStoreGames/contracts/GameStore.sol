// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract GameStore is ReentrancyGuard {
    using SafeERC20 for IERC20;

    /// @notice Token usado para pagamento
    IERC20 public immutable token;

    /// @notice Endereço do administrador
    address public immutable admin;

    struct Game {
        uint256 price;
        bool exists;
    }

    /// @notice Catálogo de jogos: gameId → (price, exists)
    mapping(uint256 => Game) public games;

    /// @notice Controle de quais jogos cada usuário já comprou
    mapping(address => mapping(uint256 => bool)) public userGames;

    event GameAdded(uint256 indexed gameId, uint256 price);
    event GameBought(address indexed buyer, uint256 indexed gameId, uint256 price);
    event Withdrawn(uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }

    modifier onlyExisting(uint256 gameId) {
        require(games[gameId].exists, "game not found");
        _;
    }

    constructor(address tokenAddress) {
        require(tokenAddress != address(0), "zero token address");
        token = IERC20(tokenAddress);
        admin = msg.sender;
    }

    /// @notice Adiciona um novo jogo ao catálogo
    function addGame(uint256 gameId, uint256 price) external onlyAdmin {
        require(price > 0, "invalid price");
        require(!games[gameId].exists, "already exists");
        games[gameId] = Game(price, true);
        emit GameAdded(gameId, price);
    }

    /// @notice Compra um jogo já existente (usuário deve aprovar allowance antes)
    function buyGame(uint256 gameId)
        external
        onlyExisting(gameId)
        nonReentrant
    {
        require(!userGames[msg.sender][gameId], "already purchased");
        uint256 price = games[gameId].price;

        // Transfere tokens de forma segura
        token.safeTransferFrom(msg.sender, address(this), price);

        // Marca como comprado e emite evento
        userGames[msg.sender][gameId] = true;
        emit GameBought(msg.sender, gameId, price);
    }

    /// @notice Permite ao admin sacar tokens acumulados na loja
    function withdraw(uint256 amount) external onlyAdmin {
        require(amount > 0, "invalid amount");
        token.safeTransfer(admin, amount);
        emit Withdrawn(amount);
    }

    /// @notice Verifica se um usuário já comprou determinado jogo
    function hasAccess(address user, uint256 gameId) external view returns (bool) {
        return userGames[user][gameId];
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////
// @author Tales Lima                                                                        //
// À propos du contrat GameStore                                                             //
// Ce contrat intitulé "GameStore" agit comme une boutique décentralisée sur la              //
// blockchain Ethereum, permettant d'acheter des jeux numériques en utilisant les            //
// tokens GameToken (GAM) créés précédemment.                                                //
//                                                                                           //
// Fonctionnalités principales :                                                             //
// 1. Achat de jeux :                                                                        //
// Les utilisateurs peuvent acheter des jeux en envoyant des tokens GAM à l'administrateur.  //
// La fonction `buyGame(...)` vérifie que le jeu existe et transfère les tokens via          //
// `transferFrom(...)`, ce qui signifie que l'utilisateur doit d'abord approuver             //
// le contrat pour dépenser ses tokens (via `approve(...)` sur le contrat GameToken).        //
//                                                                                           //
// 2. Gestion des jeux :                                                                     //
// Seul l’administrateur peut ajouter des jeux dans la boutique avec une fonction            //
// `addGame(...)` qui définit un identifiant (`gameId`) et un prix en tokens.                //
//                                                                                           //
// 3. Suivi des achats :                                                                     //
// Le contrat maintient un registre des jeux achetés par chaque utilisateur grâce à          //
// un mapping imbriqué `userGames[address][gameId]`, ce qui permet facilement de             //
// vérifier si un utilisateur a déjà acheté un jeu.                                          //
//                                                                                           //
// 4. Événement après achat :                                                                //
// Un événement `GameBought(...)` est émis à chaque achat réussi, ce qui permet aux          //
// systèmes externes (comme une interface web ou un serveur backend) de détecter             //
// automatiquement quand un utilisateur achète un jeu.                                       //
//                                                                                           //
// 5. Vérification d'accès :                                                                 //
// Une fonction publique `hasAccess(...)` permet de vérifier si un utilisateur donné         //
// possède l'accès à un jeu spécifique, utile pour contrôler l'affichage ou l'accès          //
// au contenu numérique associé.                                                             //
//                                                                                           //
// Utilisation recommandée :                                                                 //
// - Déployez d'abord le contrat GameToken.                                                  //
// - Déployez ensuite GameStore en lui passant l'adresse du contrat GameToken.               //
// - L'administrateur ajoute des jeux avec leurs prix.                                       //
// - Les utilisateurs appellent `approve(...)` puis `buyGame(...)` pour acheter.             //
///////////////////////////////////////////////////////////////////////////////////////////////
