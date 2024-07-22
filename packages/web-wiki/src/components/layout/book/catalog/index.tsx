import {useEffect} from "react";
import Sortable from 'sortablejs';
import "./style.css";

export const Catalog = () => {
    useEffect(() => {
        // Nested demo
        const nestedSortables = [].slice.call(document.querySelectorAll('.nested-sortable'));
        // Loop through each nested sortable element
        for (let i = 0; i < nestedSortables.length; i++) {
            new Sortable(nestedSortables[i], {
                group: 'nested',
                animation: 150,
                fallbackOnBody: true,
                swapThreshold: 0.65
            });
        }
    }, [])

    return <div id="nestedDemo" className="list-group col nested-sortable">
        <div className="list-group-item nested-1">Item 1.1
            <div className="list-group nested-sortable">
                <div className="list-group-item nested-2">Item 2.1</div>
                <div className="list-group-item nested-2">Item 2.2
                    <div className="list-group nested-sortable">
                        <div className="list-group-item nested-3">Item 3.1</div>
                        <div className="list-group-item nested-3">Item 3.2</div>
                        <div className="list-group-item nested-3">Item 3.3</div>
                        <div className="list-group-item nested-3">Item 3.4</div>
                    </div>
                </div>
                <div className="list-group-item nested-2">Item 2.3</div>
                <div className="list-group-item nested-2">Item 2.4</div>
            </div>
        </div>
        <div className="list-group-item nested-1">Item 1.2</div>
        <div className="list-group-item nested-1">Item 1.3</div>
        <div className="list-group-item nested-1">Item 1.4
            <div className="list-group nested-sortable">
                <div className="list-group-item nested-2">Item 2.1</div>
                <div className="list-group-item nested-2">Item 2.2</div>
                <div className="list-group-item nested-2">Item 2.3</div>
                <div className="list-group-item nested-2">Item 2.4</div>
            </div>
        </div>
        <div className="list-group-item nested-1">Item 1.5</div>
    </div>
}
