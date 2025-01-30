import { LightningElement } from 'lwc';
import porterImg from '@salesforce/resourceUrl/porterImg';
import templimeImg from '@salesforce/resourceUrl/templimeImg';
import radioheadImg from '@salesforce/resourceUrl/radioheadImg';

export default class ChallengeFiveParent extends LightningElement {

    showChild = false;
    selectedBand;
    nameInput;
    imageInput;
    descriptionInput;

    bandOptions=[
        {label: 'Porter Robinson', value: 'porter'},
        {label: 'Templime', value: 'templime'},
        {label: 'Radiohead', value: 'radiohead'}
    ];

    handleChange(e){
        this.selectedBand = e.detail.value;
        if(this.selectedBand == 'porter'){
            this.nameInput = 'Porter Robinson';
            this.imageInput = porterImg;
            this.descriptionInput = 'Porter Robinson is an American electronic music producer, DJ, and singer known for his unique blend of progressive house, electro, and future bass. He gained widespread recognition with his debut album Worlds in 2014, which showcased his ability to create emotive, atmospheric music with a mix of whimsical melodies and powerful beats. Robinson is celebrated for his distinctive sound that combines both indie and electronic influences, creating tracks that are deeply personal and emotionally resonant. His work continues to push the boundaries of electronic music, earning him a loyal global fanbase and critical acclaim.';
        }
        else if(this.selectedBand == 'templime'){
            this.nameInput = 'Templime';
            this.imageInput = templimeImg;
            this.descriptionInput = 'TEMPLIME is a music unit by Producer KBSNK and DJ tempura. They started their activities in April 2019 and released the song Neon Light featuring digital artist Toto Hoshimiya. The album Cloud Diver was released in May 2020.';
        }
        else if(this.selectedBand == 'radiohead'){
            this.nameInput = 'Radiohead';
            this.imageInput = radioheadImg;
            this.descriptionInput = 'Radiohead are an English rock band formed in Abingdon, Oxfordshire, in 1985. They comprise Thom Yorke; brothers Jonny Greenwood and Colin Greenwood; Ed OBrien; and Philip Selway. They have worked with the producer Nigel Godrich and the cover artist Stanley Donwood since 1994.';
        }

        this.showChild = true;
    }
}