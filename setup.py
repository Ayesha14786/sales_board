from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in sales_board/__init__.py
from sales_board import __version__ as version

setup(
	name="sales_board",
	version=version,
	description="An app to visualise business process mining",
	author="lmnas",
	author_email="test@lmnas.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
