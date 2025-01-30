import { LightningElement } from 'lwc';

export default class ChallengeThree extends LightningElement {
    squareClass = 'red';

    changeRed() {
        this.squareClass = 'red';
    }

    changeGreen() {
        this.squareClass = 'green';
    }

    changeBlue() {
        this.squareClass = 'blue';
    }
}