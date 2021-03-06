import {ExcelComponent} from "@core/ExcelComponent";
import {TableSelection} from "@/components/table/Table.Selection";
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }


    toHtml() {
        return `
            <div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>
        
        `
    }

    init(){
        super.init()

        this.$formula = this.$root.find('#formula')

        this.$on('table:select', $cell => {
            this.$formula.text($cell.data.value)
        })

        this.$on('table:input', $cell => {
            this.$formula.text($cell.text())
        })
    }

    onInput(event){
        this.$emit('formula:input', $(event.target).text())
    }

    onClick(event){

    }

    onKeydown(event){
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()

            this.$emit('formula:enter')
        }
    }
}