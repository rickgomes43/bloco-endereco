import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: Save,
});
