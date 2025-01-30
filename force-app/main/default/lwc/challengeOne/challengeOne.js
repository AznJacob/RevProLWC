import { LightningElement, track } from 'lwc';

export default class ChallengeOne extends LightningElement {
    @track
    inputList = [];

    handleClick(){
        this.inputList.push(this.refs.input.value);
    }
}