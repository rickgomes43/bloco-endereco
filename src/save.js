export default function Save({ attributes }) {
	const { title, address, numero } = attributes;

	return (
		<div id="wp-block-bloco-endereco">
			{address && (
				<div class="infos">
					<h2>{title}</h2>
					<p>
                        <strong>Endereço:</strong> {address.logradouro}{numero && `, ${numero}`}<br/>
                        <strong>Bairro:</strong> {address.bairro}<br/>
                        <strong>Cidade:</strong> {address.localidade}<br/>
                        <strong>Estado:</strong> {address.uf}
					</p>
				</div>
			)}
		</div>
	);
}
