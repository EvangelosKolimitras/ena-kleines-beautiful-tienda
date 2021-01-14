import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
	media: {
		height: 260,
	},
	cardContent: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	cartActions: {
		justifyContent: 'space-between',
	},
	buttons: {
		display: 'flex',
		alignItems: 'center',
	},
}));