import {MarketsInfo} from "../Helpers/MarketsInfoHelper";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import MarketChipStyles from "../Styles/MarketChipStyles";

const useMarketChipStyles = makeStyles((theme) => MarketChipStyles(theme));

export default function MarketChip(props) {
    const marketClasses = useMarketChipStyles();

    return (<Chip variant="outlined"
                  clickable
                  component='a'
                  label={MarketsInfo[props.index].name}
                  href={props.link}
                  target="_blank"
                  rel='noreferrer'
                  disabled={props.disabled}
                  color={props.disabled ? "default" : "primary"}
                  avatar={<Avatar className={marketClasses.transparentBg}
                                  variant='square'
                                  src={MarketsInfo[props.index].getIcon(props.disabled)}/>}/>);
}