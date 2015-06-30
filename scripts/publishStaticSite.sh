cd site
rm -rf build
npm run build-prod

cd .. # root
cd .. # development

cd react-popover-control-site
cp -R ../react-popover-control/site/build/ .

git add -A
git commit -m "Update website"
git push
