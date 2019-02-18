import React from 'react';

const AmountBox = ({text,type}) =>{
    return(
        <div className = 'col'>
            <div className="card">
                <div className={`card-header bg-${type} text-white`} >
                    {text}
                </div>
                <div className="card-body">
                    999
                </div>
            </div>
        </div>
    );
}

export default AmountBox