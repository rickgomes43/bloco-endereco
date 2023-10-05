<?php
/**
 * Plugin Name:     Bloco de Endereço
 * Plugin URI: 		https://github.com/rickgomes43/bloco-endereco/blob/main/README.md
 * Description:     Plugin de Teste para Studio Visual.
 * Author:          Ricardo Gomes
 * Author URI:      https://www.rickgomes.com.br
 * Text Domain:     bloco-endereco
 * Version:         1.0
 *
 * @package         bloco-endereco
 */

function create_block_bloco_endereco_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_bloco_endereco_block_init' );
