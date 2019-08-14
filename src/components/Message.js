import React from "react";
import PropTypes from "prop-types";
import "./Message.scss";

const Message = (props) => {
    const removeMesage = (event) => {
        const index = parseInt(event.target.dataset.index, 10);
        props.handleClearMessage(index);
    };

    const messageItems = props.messages.map((item, index) => {
        const additionalClass = item.type === "error" ? "message__item--error" : "";
        return (
            <li className={ `message__item ${ additionalClass }` } key={ item.messageId }>
                <span className="message__item__text">{ item.content }</span>
                <button className="message__item__clear" onClick={ removeMesage } data-index={ index }>X</button>
            </li>
        );
    });

    return (
        <ul className="message">{ messageItems }</ul>
    );
}


Message.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(["error", "message"]),
        content: PropTypes.string,
        messageId: PropTypes.number
    })),
    handleClearMessage: PropTypes.func
};

Message.defaultProps = {
    messages: [],
    handleClearMessage: () => {}
};

export default Message;
