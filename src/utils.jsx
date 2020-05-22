export const testing = false;

export const marketValue = props => {
    let modifier = ((1+props.demand) / (1+props.supply));
    if (modifier < 0.5) {modifier = 0.5};
    return Math.floor(props.base * modifier);
}

export function rollD6(dice = 1) {
    let result = 0;
    var i;
    for (i = 0; i < dice; i++) {
        result += Math.floor(Math.random() * 6) + 1;
    }
        return result;
}