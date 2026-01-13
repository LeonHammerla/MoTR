FROM ubuntu:22.04
# Prevent interactive prompts during package installation (fixes tzdata hang)
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    gnupg \
    python3 \
    python3-pip \
    r-base \
    && rm -rf /var/lib/apt/lists/*

# Install exact Node.js version recommended by the repo: 16.20.2
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@8  # Optional: pin a compatible npm version if needed

# Set working directory
WORKDIR /app

# Clone the repository
# RUN git clone https://github.com/wilcoxeg/MoTR.git
RUN git clone https://github.com/LeonHammerla/MoTR.git

# Prepare 'provo' experiment (clean + install + build)
RUN cd /app/MoTR/MoTR/run_motr_in_magpie/provo && \
    rm -rf package-lock.json node_modules && \
    npm install && \
    npm run build

# Prepare 'attachment' experiment (same steps)
# RUN cd /app/MoTR/MoTR/run_motr_in_magpie/attachment && \
#    rm -rf package-lock.json node_modules && \
#    npm install && \
#    npm run build


# Expose the port used by npm run serve (usually 8080 for Vue/Magpie apps)
EXPOSE 8080

# Default: start the 'provo' experiment server
CMD ["bash", "-c", "cd /app/MoTR/MoTR/run_motr_in_magpie/provo && npm run serve"]