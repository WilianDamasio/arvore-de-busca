// data-structures/BinarySearchTree.js

class Node {
    constructor(dado) {
        this.dado = dado;
        this.esquerda = null;
        this.direita = null;
    }
}

/**
 * Classe BinarySearchTree: Gerencia os Nós em uma estrutura de árvore binária de busca.
 */
class BinarySearchTree {
    constructor() {
        this.raiz = null; // A árvore começa sem nenhum nó.
    }

    /**
     * Método público para inserir um novo dado na árvore.
     */
    insert(dado) {
        const novoNo = new Node(dado);

        // Se a árvore está vazia, o novo nó é a raiz.
        if (this.raiz === null) {
            this.raiz = novoNo;
        } else {
            // Se não, chama a função auxiliar recursiva para encontrar a posição correta.
            this._insertNode(this.raiz, novoNo);
        }
    }

    /**
     * Método privado e recursivo para inserir um nó.
     * @param {Node} node - O nó atual que estamos comparando.
     * @param {Node} novoNo - O novo nó a ser inserido.
     */
    _insertNode(node, novoNo) {
        // Se o novo dado é menor que o dado do nó atual, vamos para a esquerda.
        if (novoNo.dado < node.dado) {
            // Se não há filho à esquerda, encontramos o lugar! Inserimos aqui.
            if (node.esquerda === null) {
                node.esquerda = novoNo;
            } else {
                // Se já há um filho, chamamos a função novamente para esse filho.
                this._insertNode(node.esquerda, novoNo);
            }
        } 
        // Se o novo dado é maior, vamos para a direita.
        else {
            // Se não há filho à direita, encontramos o lugar! Inserimos aqui.
            if (node.direita === null) {
                node.direita = novoNo;
            } else {
                // Se já há um filho, chamamos a função novamente para esse filho.
                this._insertNode(node.direita, novoNo);
            }
        }
    }

     /**
     * Método público para buscar um dado na árvore.
     * @param {*} dado - O dado a ser procurado.
     * @returns {boolean} Retorna true se o dado for encontrado, false caso contrário.
     */
    search(dado) {
        // Inicia a busca recursiva a partir da raiz da árvore.
        return this._searchNode(this.raiz, dado);
    }

    /**
     * Método privado e recursivo para buscar um nó.
     * @param {Node} node - O nó atual que estamos verificando.
     * @param {*} dado - O dado que estamos procurando.
     */
    _searchNode(node, dado) {
        // Caso Base 1: Chegamos a um galho vazio (null). O dado não existe.
        if (node === null) {
            return false;
        }

        // Caso Base 2: Encontramos o dado!
        if (dado === node.dado) {
            return true;
        }

        // Passo Recursivo: Se o dado que buscamos é menor, vamos para a esquerda.
        if (dado < node.dado) {
            return this._searchNode(node.esquerda, dado);
        }
        // Se o dado que buscamos é maior, vamos para a direita.
        else {
            return this._searchNode(node.direita, dado);
        }
    }

      /**
     * Método público para iniciar o percurso em ordem.
     * @returns {Array<*>} Um array com todos os dados da árvore em ordem.
     */
    inOrder() {
        const resultado = [];
        this._inOrder(this.raiz, resultado);
        return resultado;
    }
    /**
     * Método privado e recursivo para percurso in-order.
     * @param {Node} node - Nó atual.
     * @param {Array<*>} resultado - Array acumulador dos dados.
     * Executa: esquerda -> raiz -> direita.
     */
    _inOrder(node, resultado) {
        if (node !== null) {
            this._inOrder(node.esquerda, resultado);
            resultado.push(node.dado);
            this._inOrder(node.direita, resultado);
        }
    }
    /**
     * Método público para iniciar o percurso em ordem.
     * @returns {Array<*>} Um array com todos os dados da árvore em ordem.
     */
    reverseInOrder() {
        const resultado = [];
        this._reverseInOrder(this.raiz, resultado);
        return resultado;
    }
    /**
     * Método privado e recursivo para percurso reverse in-order.
     * @param {Node} node - Nó atual.
     * @param {Array<*>} resultado - Array acumulador dos dados.
     * Executa: direita -> raiz -> esquerda.
     */
    _reverseInOrder(node, resultado) {
        if (node !== null) {
            this._reverseInOrder(node.direita, resultado);
            resultado.push(node.dado);
            this._reverseInOrder(node.esquerda, resultado);
        }
    }

    /**
     * Método público para iniciar o percurso em pré-ordem (Raiz -> Esquerda -> Direita).
     */
    preOrder() {
        const resultado = [];
        this._preOrder(this.raiz, resultado);
        return resultado;
    }

    /**
     * Método privado e recursivo para percurso pre-order.
     * @param {Node} node - Nó atual.
     * @param {Array<*>} resultado - Array acumulador dos dados.
     * Executa: raiz -> esquerda -> direita.
     */
    _preOrder(node, resultado) {
        if (node !== null) {
            resultado.push(node.dado);
            this._preOrder(node.esquerda, resultado);
            this._preOrder(node.direita, resultado);
        }
    }

    // --- MÉTODOS Post-Order ---
    /**
     * Método público para iniciar o percurso em pós-ordem (Esquerda -> Direita -> Raiz).
     */
    postOrder() {
        const resultado = [];
        this._postOrder(this.raiz, resultado);
        return resultado;
    }

    /**
     * Método privado e recursivo para percurso post-order.
     * @param {Node} node - Nó atual.
     * @param {Array<*>} resultado - Array acumulador dos dados.
     * Executa: esquerda -> direita -> raiz.
     */
    _postOrder(node, resultado) {
        if (node !== null) {
            this._postOrder(node.esquerda, resultado);
            this._postOrder(node.direita, resultado);
            resultado.push(node.dado);
        }
    }

}

module.exports = BinarySearchTree;