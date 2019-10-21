import React from 'react'
import './Modals.css'

const Modals = props => {
    return(
        <div className="Modals">
           <div className="modal modal_win_bg modal--align-top modal_win_bg_can_close" role="dialog" aria-hidden="true" >
                <div className="modal_win_dialog">
                    <div className="modal_win_content">
                        <div>
                            {props.children}
                        </div>
                        <a href="#" className="modal_win_close  demo-close"><i className="fa fa-times" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modals