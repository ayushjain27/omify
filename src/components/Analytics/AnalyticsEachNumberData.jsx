import { Card, Typography, Box, Skeleton } from '@mui/material';

export default function AnalyticsEachNumberData(props) {
  const { title, number, sx, selectedFeature, val, isMultipleData, newNumber, loading } = props;
  return (
    <>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={80} />
      ) : (
        <Card sx={{ p: 1, width: '100%', backgroundColor: '#fff', borderRadius: '6px', ...sx }}>
          <Typography sx={{ fontSize: '16px', color: 'black', fontWeight: '700' }}>{title}</Typography>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: '20px', color: 'black', fontWeight: '700', mt: 1 }}>{number}</Typography>
            {isMultipleData && (
              <>
                <Typography sx={{ fontSize: '20px', color: 'black', fontWeight: '700', mt: 1 }}>||</Typography>
                <Typography sx={{ fontSize: '20px', color: 'black', fontWeight: '700', mt: 1 }}>{newNumber}</Typography>
              </>
            )}
          </Box>
        </Card>
      )}
    </>
  );
}
