class AndroidsPanelBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {androids: props.androids};
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.androids != nextProps.androids) {

            this.setState({ androids: nextProps.androids});
        }
    }

    render() {

        let AndroidElems = [];
        let Androids = this.props.androids;

        for (let i = 0; i < Androids.length; i++) {
            AndroidElems.push(<Android key={Androids[i].Id} android={Androids[i]} setEditableData={this.props.setEditableData} hideForms={this.props.hideForms} onDeleteAndroid={this.props.onDeleteAndroid} />);
        }

        return <div className="panel-body">
                <CreateAndroidButton hideForms={this.props.hideForms}/>
                {AndroidElems}
                </div>
    }
}