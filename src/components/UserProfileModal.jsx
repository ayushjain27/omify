import { Box, Button, DialogTitle, Dialog, DialogContent, Typography, Card, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import _ from 'lodash';

export default function UserProfile(props) {

  return (
    <Card sx={{ p: 2 }}>
      {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <DialogTitle variant="h3"> B2B Partner details</DialogTitle>
        <IconButton onClick={() => setUserDetailDialog(false)}>
          <CloseIcon />
        </IconButton>
      </div> */}
{/* 
      <div style={{ height: '100%', flexDirection: 'column', overflow: 'scroll', paddingBottom: '36px' }}>
        <DialogContent>
          <Card sx={{ p: 1, mt: 2 }}>
            <Typography>Basic Info</Typography>
            <Stack spacing={2} sx={{ paddingLeft: 1, mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Owner Name
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  {`${userData?.nameSalutation}\n${userData?.ownerName}`}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Business Name
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.businessName}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Company Type
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.companyType}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Registration Date
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  {moment(userData?.registrationDate).format('DD MMM YY')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Category
                </Typography>

                <Typography sx={{ fontSize: '14px' }}>
                  {_.isArray(userData?.category)
                    ? _.chain(userData?.category)
                        .map((sub) => sub?.name)
                        .join(', ')
                        .value()
                    : userData?.category?.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Sub Category
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  {_.isArray(userData?.subCategory)
                    ? _.chain(userData?.subCategory)
                        .map((sub) => sub?.name)
                        .join(', ')
                        .value()
                    : userData?.subCategory?.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Brand Names
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  {' '}
                  {_.isArray(userData?.brand)
                    ? _.chain(userData?.brand)
                        .map((sub) => sub?.name)
                        .join(', ')
                        .value()
                    : userData?.brand?.name}{' '}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  User Name
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.userName}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  User Id
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.userId}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Created at
                </Typography>

                <Typography sx={{ fontSize: '14px' }}> {moment(userData?.createdAt).format('DD MMM YY')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Updated at
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{moment(userData?.updatedAt).format('DD MMM YY')}</Typography>
              </Box>
            </Stack>
          </Card>
          <Card sx={{ p: 1, mt: 2 }}>
            <Typography>Contact Info</Typography>
            <Stack spacing={2} sx={{ paddingLeft: 1, mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>Email</Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.contactInfo?.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Primary Phone No.
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.contactInfo?.phoneNumber.primary} </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Secondary Phone No.
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.contactInfo?.phoneNumber.primary} </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Address
                </Typography>
                <Typography sx={{ fontSize: '14px', width: '600px' }}>{userData?.contactInfo?.address}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>City</Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.contactInfo?.city}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>State</Typography>
                <Typography sx={{ fontSize: '14px' }}> {userData?.contactInfo?.state}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Pincode
                </Typography>
                <Typography sx={{ fontSize: '14px' }}> {userData?.contactInfo?.pincode}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Latitude
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  {' '}
                  {userData?.contactInfo?.geoLocation?.coordinates?.[1]}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Longitude
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  {userData?.contactInfo?.geoLocation?.coordinates?.[0]}
                </Typography>
              </Box>
            </Stack>
          </Card>
          <Card sx={{ p: 1, mt: 2 }}>
            <Typography>WareHouse Info</Typography>
            <Stack spacing={2} sx={{ paddingLeft: 1, mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>Email</Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.wareHouseInfo?.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Primary Phone No.
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.wareHouseInfo?.phoneNumber.primary} </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Secondary Phone No.
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.wareHouseInfo?.phoneNumber.primary} </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Address
                </Typography>
                <Typography sx={{ fontSize: '14px', width: '600px' }}>{userData?.wareHouseInfo?.address}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>City</Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.wareHouseInfo?.city}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>State</Typography>
                <Typography sx={{ fontSize: '14px' }}> {userData?.wareHouseInfo?.state}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Pincode
                </Typography>
                <Typography sx={{ fontSize: '14px' }}> {userData?.wareHouseInfo?.pincode}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Latitude
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  {' '}
                  {userData?.wareHouseInfo?.geoLocation?.coordinates?.[1]}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Longitude
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  {userData?.wareHouseInfo?.geoLocation?.coordinates?.[0]}
                </Typography>
              </Box>
            </Stack>
          </Card>
          <Card sx={{ p: 1, mt: 2 }}>
            <Typography>Product Category</Typography>
            <Stack spacing={2} sx={{ paddingLeft: 1, mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Category
                </Typography>

                <Typography sx={{ fontSize: '14px' }}>
                  {_.isArray(userData?.productCategory?.category)
                    ? _.chain(userData?.productCategory?.category)
                        .map((sub) => sub?.name)
                        .join(', ')
                        .value()
                    : userData?.productCategory?.category?.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Sub Category
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  {_.isArray(userData?.productCategory?.subCategory)
                    ? _.chain(userData?.productCategory?.subCategory)
                        .map((sub) => sub?.name)
                        .join(', ')
                        .value()
                    : userData?.productCategory?.subCategory?.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Brand Names
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.productCategory?.brand}</Typography>
              </Box>
            </Stack>
          </Card>
          <Card sx={{ p: 1, mt: 2 }}>
            <Typography>Documents</Typography>
            <Stack spacing={2} sx={{ paddingLeft: 1, mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  GST Number
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.documents?.gstData?.gstin}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  PAN Number
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.documents?.panNumber}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Website URL
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.documents?.websiteUrl}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Membership
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.documents?.memberShip}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Membership ID
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{userData?.documents?.memberShipId}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Open Time
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  {' '}
                  {moment(userData?.documents?.businessOpenTime).format('hh:mm A')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Close Time
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  {moment(userData?.documents?.businessCloseTime).format('hh:mm A')}
                </Typography>
              </Box>
            </Stack>
          </Card>

          <Card sx={{ p: 1, mt: 2, mb: 4 }}>
            <Typography>Profile</Typography>
            <Stack spacing={2} sx={{ paddingLeft: 1, mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  Company Logo
                </Typography>
                <Box
                  component="img"
                  src={userData?.documentImageList?.logo?.docURL}
                  sx={{ border: '1 px solid #999999', height: '80px', width: '80px', borderRadius: '2px' }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  GST Image
                </Typography>
                <Box
                  component="img"
                  src={userData?.documentImageList?.gstView?.docURL}
                  sx={{ border: '1 px solid #999999', height: '80px', width: '80px', borderRadius: '2px' }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  PAN Image
                </Typography>
                <Box
                  component="img"
                  src={userData?.documentImageList?.panFrontView?.docURL}
                  sx={{ border: '1 px solid #999999', height: '80px', width: '80px', borderRadius: '2px' }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontSize: '14px', width: '350px', fontWeight: 500, opacity: 0.4 }}>
                  AADHAAR Images
                </Typography>
                <Box
                  component="img"
                  src={userData?.documentImageList?.aadhaarFrontView?.docURL}
                  sx={{ border: '1 px solid #999999', height: '80px', width: '80px', borderRadius: '2px' }}
                />
                <Box
                  component="img"
                  src={userData?.documentImageList?.aadhaarBackView?.docURL}
                  sx={{ border: '1 px solid #999999', height: '80px', width: '80px', borderRadius: '2px' }}
                />
              </Box>
            </Stack>
          </Card>
        </DialogContent>
      </div> */}
    </Card>
  );
}
