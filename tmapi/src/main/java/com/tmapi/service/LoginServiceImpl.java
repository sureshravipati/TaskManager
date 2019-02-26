package com.tmapi.service;

import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.tmapi.dao.AppUserDAO;
import com.tmapi.model.AppUser;
import com.tmapi.to.AuthTokenInfo;
import com.tmapi.to.LoginUserTO;

@Service
public class LoginServiceImpl implements LoginService{
	
	private AuthTokenInfo tokenResponse;
	
	private HttpHeaders headers;
	
	private RestTemplate restClient;
	
	@Autowired 
	private AppUserDAO userDao;
	
	@Value("${oauth.token.url}")
	private String oauthUrl;
	
	@Override
	public LoginUserTO Gettoken(LoginUserTO user) throws Exception {	
		LoginUserTO loginUser=new LoginUserTO();
		try {
			headers = new HttpHeaders();
			restClient = this.getRestClient();
			headers.add("Authorization", "Basic " + encodeKeys("my-client", "my-secret"));
			headers.add("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
			tokenResponse = restClient.postForObject(
					oauthUrl.concat("?username="+user.getUserId()
					+"&password="+user.getPassword()+"&grant_type=password"),
					new HttpEntity<String>(headers), AuthTokenInfo.class);

			if (tokenResponse != null) {				
				loginUser.setToken(tokenResponse.getAccess_token());
				loginUser.setUserId(user.getUserId());
				loginUser.setIsExist("true");				
			} else {
				loginUser.setIsExist("false");
			}
		} catch (Exception e) {
			loginUser.setIsExist("false");
		}
		return loginUser;

	}

	private RestTemplate getRestClient() throws Exception {	
		RestTemplate restTemplate;
		CloseableHttpClient httpClient;
	    HttpComponentsClientHttpRequestFactory requestFactory;
	    	try {
                  httpClient = HttpClients.custom().setSSLHostnameVerifier(new NoopHostnameVerifier()).build();
                  requestFactory = new HttpComponentsClientHttpRequestFactory();
                  requestFactory.setHttpClient(httpClient);
                  restTemplate = new RestTemplate(requestFactory);
              }catch(Exception ex) {                 
                   throw new Exception(ex.getMessage());
              }            
	     return restTemplate;            
	   }
    private String encodeKeys(String consumerKey, String consumerSecret) {
         String fullKey = consumerKey + ":" + consumerSecret;         
        return new String(Base64.encodeBase64(fullKey.getBytes()));
      }

	@Override
	public boolean addUser(LoginUserTO user) {
		AppUser entity=new AppUser();
		try {
			entity.setUserId(user.getUserId());
			entity.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
			userDao.save(entity);
			return true;
		}catch (Exception e) {
			return false;
		}		
	}

}
