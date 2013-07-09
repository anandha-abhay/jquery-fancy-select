describe('FancySelect', function() {
  it('should be able to import fixtures', function() {
    loadFixtures('fields.html');
    expect($('#jasmine-fixtures')).toExist();
  });
});
