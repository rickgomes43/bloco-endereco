// import './editor.scss';
import { useState } from '@wordpress/element';
import { TextControl, Notice } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { title, cep, address } = attributes;

    const [titleTouched, setTitleTouched] = useState(false);
    const [cepTouched, setCepTouched] = useState(false);
    const [numero, setNumero] = useState('');
    const [titleError, setTitleError] = useState(null);
    const [cepError, setCepError] = useState(null);

    const onTitleBlur = () => {
        setTitleTouched(true);
        if (!title) {
            setTitleError('O título é obrigatório.');
        } else {
            setTitleError(null);
        }
    };

    const onCepBlur = () => {
        setCepTouched(true);
        setNumero('');  
        setAttributes({ address: null }); 

        if (!cep) {
            setCepError('O CEP é obrigatório.');
        } else {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.erro) {
                        setCepError('CEP inválido.');
                    } else {
                        setAttributes({ address: data });
                        setCepError(null);
                    }
                })
                .catch(() => {
                    setCepError('Erro de comunicação com a API.');
                });
        }
    };

    return (
        <div id="wp-block-bloco-endereco">

            <TextControl
                label="Título*"
                value={title}
                onChange={(value) => setAttributes({ title: value })}
                onBlur={onTitleBlur}
                maxLength={80}
                placeholder="Adicione seu título para o card de Endereço"
            />
            {titleTouched && titleError && (
                <Notice status="error" isDismissible={false}>
                    {titleError}
                </Notice>
            )}

            <TextControl
                label="CEP*"
                value={cep}
                onChange={(value) => {
                    const onlyNumbers = value.replace(/[^0-9]/g, '');
                    setAttributes({ cep: onlyNumbers });
                }}
                onBlur={onCepBlur}
                maxLength={8}
                placeholder="Insira o CEP (Somente números)"
                />            
            {cepTouched && cepError && (
                <Notice status="error" isDismissible={false}>
                    {cepError}
                </Notice>
            )}

            {address && (
                <>
                    <TextControl
                        label="Número"
                        value={numero}
                        onChange={(value) => setNumero(value)}
                        placeholder="Insira o número"
                    />
                    <span>Prévia da visualização no site:</span>
                    <div class="infos">
						<h2>{title}</h2>
						<p>
							<strong>Endereço:</strong> {address.logradouro}{numero && `, ${numero}`}<br/>
							<strong>Bairro:</strong> {address.bairro}<br/>
							<strong>Cidade:</strong> {address.localidade}<br/>
							<strong>Estado:</strong> {address.uf}
						</p>
                    </div>
                </>
            )}
        </div>
    );
}
