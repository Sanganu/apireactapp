const dateFormat = date => {
    return  `${moment().format('L')}    ${moment().format('LTS')}  `
}

export default dateFormat