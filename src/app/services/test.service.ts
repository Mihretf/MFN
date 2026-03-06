import {
  authService,
  blogService,
  churchService,
  galleryService,
  regionService,
} from "./app.service";

export async function testPublicApis() {
  try {
    const blogs = await blogService.getBlogs();

    console.log("Blogs response:", blogs);

    const invite = await authService.validateInvite("sample-token");

    console.log("Invite validation:", invite);
  } catch (error) {
    console.error("API error:", error);
  }
}

testPublicApis();

export async function testProtectedApis() {
  try {
    // login
    const login = await authService.login({
      email: "alemuyohannes960@gmail.com",
      password: "SuperStrongPassword123!",
    });

    const token = login.token;

    console.log("JWT token:", token);

    // get regions
    const regions = await regionService.getRegions(token);

    console.log("Regions:", regions);

    const galleries = await galleryService.getGalleries(
      {
        region_id: "c80e45ce-cee3-4793-b9d9-09082bda8b99",
      },
      token,
    );

    console.log("Gallery response:", galleries);
  } catch (error) {
    console.error("API error:", error);
  }
}
