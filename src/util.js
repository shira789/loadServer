const wait = (ms) => (
    new Promise (res => ( setTimeout(res, ms)))
);

const randNumber = (max) => (
	Math.floor(Math.random() * max)
)

export {
    randNumber,
    wait
};