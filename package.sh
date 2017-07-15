# usage $0
main_ver="0.6"
ver_file=.releaseVersion
if [ ! -f $ver_file ];then
  echo "$ver_file not exists, create with version 0"
  echo 0 > $ver_file
fi
#-------------------------------------------------------------------------------
# GET PREVIOUS BUILD VERSION
prev_build=`cat $ver_file`
let current_build=$prev_build+1
version_string="${main_ver}.${current_build}"
# echo "versionCode $current_build"
echo "versionName $version_string"

#-------------------------------------------------------------------------------
# BUILD
cd android

gradle_file=app/build.gradle
gsed -ri 's/(versionName) \"[0-9\.]{1,}\"/\1 "'$version_string'"/' $gradle_file
./gradlew assembleRelease
apk=app/build/outputs/apk/app-release.apk
if [ ! -f $apk ]; then
  echo "*** get build apk $apk failed!"
  exit 1
fi
cp $apk ~/work/edu/public/apk/
scp $apk root@118.178.137.111:/root/www/edu/current/public/apk/

echo download url:
echo http://192.168.1.31:3005/apk/app-release.apk
echo http://118.178.137.111/apk/app-release.apk
cd -
#-------------------------------------------------------------------------------
# UPDATE RELEASE VERSION
echo "write current build ${current_build} to ${ver_file}"
echo $current_build > $ver_file
