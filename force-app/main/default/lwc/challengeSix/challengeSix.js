import { LightningElement , api} from 'lwc';

export default class ChallengeSix extends LightningElement {
    @api bandDescription;

    showDescription = false;
    handleClick(){
        this.showDescription = !this.showDescription;
    }
}