import { LightningElement } from 'lwc';

export default class ChallengeTwo extends LightningElement {
    headerText = 'Challenge Two';
    showInput = false;

    handleClick(){
        this.showInput = !this.showInput;
    }

    handleChange(){
        this.headerText = this.refs.input.value;
    }
}