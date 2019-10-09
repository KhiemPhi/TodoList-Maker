import React, { Component } from 'react'

export class ModalDialog extends Component {
    
    render() {
        return (
            <div className="modal" id="modal_yes_no_dialog" dataAnimation="slideInOutLeft">
                <div className="modal_dialog">
                     <header className="dialog_header">
                        Delete list?
                    </header>
                    <section className="dialog_content">
                        <p><strong>Are you sure you want to delete this list?</strong></p>
                    </section>
                <button id="dialog_yes_button" onClick = {this.props.deleteList} >Yes</button>
                <button id="dialog_no_button" >No</button>
                <footer className="dialog_footer">
                    The list will not be retreivable.
                </footer>
        </div>
    </div>
              
        )
    }
}

export default ModalDialog
