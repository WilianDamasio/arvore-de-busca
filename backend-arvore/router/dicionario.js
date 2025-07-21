// backend-arvore/rotas/dicionario.js

const express = require('express');
const router = express.Router();
const BinarySearchTree = require('../data-structures/BinarySearchTree');

// Criamos UMA instância da nossa árvore.
// Ela funcionará como nosso dicionário em memória.
const dicionario = new BinarySearchTree();

/**
 * @route   POST /api/dicionario/inserir
 * @desc    Insere uma nova palavra na árvore.
 * @access  Public
 */
router.post('/inserir', (req, res) => {
    try {
        const { palavra } = req.body;

        if (!palavra || typeof palavra !== 'string') {
            return res.status(400).json({ message: 'O campo "palavra" é obrigatório e deve ser um texto.' });
        }

        dicionario.insert(palavra.toLowerCase());
        console.log(`Palavra inserida na árvore: "${palavra.toLowerCase()}"`);
        res.status(201).json({ message: `Palavra "${palavra.toLowerCase()}" inserida com sucesso.` });
    } catch (error) {
        console.error('Erro ao inserir palavra:', error);
        res.status(500).json({ message: 'Erro interno ao inserir palavra.' });
    }
});

/**
 * @route   GET /api/dicionario/buscar/:palavra
 * @desc    Busca uma palavra na árvore.
 * @access  Public
 */
router.get('/buscar/:palavra', (req, res) => {
    try {
        const { palavra } = req.params;
        const encontrada = dicionario.search(palavra.toLowerCase());

        if (encontrada) {
            console.log(`Busca pela palavra "${palavra.toLowerCase()}": Encontrada!`);
            res.status(200).json({ encontrada: true, palavra: palavra.toLowerCase() });
        } else {
            console.log(`Busca pela palavra "${palavra.toLowerCase()}": Não encontrada.`);
            res.status(404).json({ encontrada: false, palavra: palavra.toLowerCase() });
        }
    } catch (error) {
        console.error('Erro ao buscar palavra:', error);
        res.status(500).json({ message: 'Erro interno ao buscar palavra.' });
    }

});


/**
 * @route   GET /api/dicionario/palavras
 * @desc    Retorna todas as palavras da árvore em ordem alfabética.
 * @access  Public
 */
router.get('/palavras', (req, res) => {
    // 1. Pega o parâmetro 'tipo' da URL. Ex: /palavras?tipo=preorder
    //    Define 'inorder' como o valor padrão se nenhum tipo for fornecido.
    const tipoPercurso = parseInt(req.query.tipo);

    let palavras;

    console.log(`Tipo de percurso solicitado: ${tipoPercurso || 'inorder'}`);
    // 2. Decide qual método da nossa classe chamar com base no parâmetro.
    switch (tipoPercurso) {
        case 1:
            palavras = [{"Tipo":"Crescente"},
                        dicionario.inOrder()];
            break;
        case 2:
            palavras = [{"Tipo":"Crescente"},
                        dicionario.reverseInOrder()];
            break;
        default:
            // 3. Se um tipo inválido for fornecido, retorna um erro amigável.
            return res.status(400).json({ 
                message: 'Tipo de percurso inválido.',
                opcoesValidas: ['1 - Crescente', '2 - Decrescente']
            });
    }

    console.log(`Lista de palavras (${tipoPercurso}) solicitada.`);
    res.status(200).json(palavras);
});



module.exports = router;