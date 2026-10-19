$urls = @(
  'http://localhost:3000',
  'http://localhost:3000/rajasthan',
  'http://localhost:3000/rajasthan/nagaur',
  'http://localhost:3000/rajasthan/patna',
  'http://localhost:3000/rajasthan/pune',
  'http://localhost:3000/rajasthan/lucknow',
  'http://localhost:3000/rajasthan/gorakhpur',
  'http://localhost:3000/rajasthan/ahmedabad'
)

foreach ($u in $urls) {
  try {
    $res = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 10
    Write-Host "$u -> $($res.StatusCode)"
  } catch {
    Write-Host "$u -> Error: $_"
  }
}
