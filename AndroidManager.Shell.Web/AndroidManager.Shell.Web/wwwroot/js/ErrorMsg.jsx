class ErrorMsg extends React.Component {

    constructor(props) {
        super(props);
        this.state = { msg: "", show: false};
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.errNum != nextProps.errNum ) {

            this.setState({ msg: nextProps.msg , show: true});
        }
    }

    render() {

        if (this.state.show == true) {
            setTimeout(() => { this.setState({ show: false }); }, 3000);
        }

        return <div>
                {this.state.show && <h3 className="text-danger text-center error-anim">{this.state.msg}</h3>}
            </div>;
    }
}